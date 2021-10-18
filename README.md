# Backoffice + pasarela de pago
<br/>

## Estructura del proyecto

<br/>

El proyecto está estructurado en dos bloques, el ***core*** que contiene la declaración de las bases para el funcionamiento del proyecto y ***models*** que contiene la implementación específica de dichas bases.

<br/>

### ***core***

<br/>

Dentro del ***core*** podemos encontrar dos interfaces principales, y algunas otras auxiliares:

<br/>

- IPaymentGateway: 

Describe el comportamiento básico de toda pasarela de pago que se desee integrar a la plataforma. Contiene las funciones pay, reimburse y setConfig. Pay y Reimburse se encargarán de realizar los pagos y devoluciones de cada pasarela, dejando la responsabilidad de implementarlas al desarrollador que se encargue de realizar cada integración.

setConfig tiene la funcionalidad de cambiar la configuración de la plataforma de pago para un usuario en específico (en este caso solo incluimos si está activa o no). Si queremos que dicha configuración sea persistente en su implementación debería realizarse alguna actualización en bd, pero dicha responsabilidad pertenecerá a la implementación de cada pasarela de pago en particular, pues cada una puede tener sus propias configuraciones.

<br/>

- IResult, IOptions, IUser, IPaymentDetails:

Estas interfaces agrupan los campos de resultados de una operación (IResult), configuración (IOptions), datos del usuario (IUser) y detalles del pago (IPaymentDetails).

Para futuros desarrollos donde se necesiten nuevos campos en cada una de estas interfaces, se deberán crear nuevas que implementen las originales. Gracias a la covarianza y la forma en que está estructurado el proyecto este seguirá siendo funcional.

<br/>

Ej:

```ts
interface IOptionsExtended implements IOptions{
    //some new fields
}
```

<br/>

- IPaymentManager

En sistemas de pagos generalmente es deseable establecer ciertos controles sobre los pagos y reembolsos independientemente de la pasarela de pago que se utilice. Para ello sería conveniente tener un punto centralizado que controle cada una de estas funcionalidades (en caso contrario obligaríamos a cada integración de pasarela de pago a implementar dichos controles, que pueden ser anteriores o posteriores a cada transacción).

Esta es precisamente la función de **IPaymentManager**, a través de la implementación del patrón de diseño ***Command*** se encargará de actuar como intermediario entre nuestro sistema y cada plataforma de pago. De ahí que pueda encargarse de hacer ***logging*** sobre cada transacción, guardar en base de datos, o simplemente gestionar errores.

<br/>

### ***models***

<br/>

Contiene las implementaciones de las interfaces descritas anteriormente. 

- Las pasarelas de pagos pgateway_1 y pgateway_2 implementan la interface IPaymentGateway según los requerimientos del problema. Como entendemos que el objetivo del proyecto es más bien estructural las funciones pay y reimburse no tienen implementación.

- La clase PaymentManager implementa la interface IPaymentManager

<br/>

## Ejemplo de cómo ejecutar transacción:

<br/>

```ts
pgateway_1PayEndpointHandler(paymentDetails: IPaymentDetails){

    let pGateway: IPaymentGateway = new pgateway_1(); 

    let pManager: IPaymentManager = new PaymentManager();  

    let result:IResult = pManager.pay( paymentDetails, pGateway );

    return result;

}
```

<br/>

## Proceso para integrar nueva plataforma:
<br/>

1. Crear clase que implemente IPaymentGateway.
2. Realizar los pagos y reembolsos a traves de una instancia de IPaymentManager.
<br/>

```ts

export interface IPaymentManager {
  //command pattern implementation

  /**
   * Ejecuta un pago
   * @param payment detalles del pago a realizar
   * @param paymentGateway pasarela de pago por donde se realizará el pago
   * @returns resultado del pago
   */
  pay(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;

  /**
   * Ejecuta un reembolso
   * @param payment detalles del reembolso a realizar
   * @param paymentGateway pasarela de pago por donde se realizará el reembolso
   * @returns resultado del reembolso
   */
  reimburse(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;
}
```

<br/>
<br/>

En caso de que se quisiera que un nuevo grupo de pasarelas de pagos compartiera alguna otra funcionalidad, y que dicha funcionalidad estuviera centralizada, bastaría con crear una nueva implementación de IPaymentManager, y una nueva interfaz que implemente IPaymentGateway y agrupe las nuevas funcionalidades.

Ej:

```ts

interface IPaymentGatewayExtended implements IPaymentGateway {  //nueva funcionalidad
  partialReimburse(payment: IPaymentDetails): IResult;
}

class pgateway_3 implements IPaymentGatewayExtended{   //implementación de nueva funcionalidad
    //... some code
}

interface IPaymentManagerExtended implements IPaymentManager {   //command pattern para nueva funcionalidad
  partialReimburse(payment: IPaymentDetails, paymentGateway: IPaymentGatewayExtended): IResult;
}
```

