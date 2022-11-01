type Purchase = any;

let Logistics: any;

interface Delivery {
    deliverProduct();
    trackProduct();
}

class DeliveryImplementation {
    protected purchase: Purchase;

    constructor(purchase: Purchase) {
        this.purchase = purchase;
    }
}

class ExpressDelivery extends DeliveryImplementation implements Delivery {
    deliverProduct() {
        Logistics.issueExpressDelivery(this.purchase.product);
    }

    trackProduct() {
        Logistics.trackExpressDelivery(this.purchase.product);
    }
}

class InsuredDelivery extends DeliveryImplementation implements Delivery {
    deliverProduct() {
        Logistics.issueInsuredDelivery(this.purchase.product);
    }

    trackProduct() {
        Logistics.trackInsuredDelivery(this.purchase.product);
    }
}

class StandardDelivery extends DeliveryImplementation implements Delivery {
    deliverProduct() {
        Logistics.issueStandardDelivery(this.purchase.product);
    }

    trackProduct() {
        Logistics.trackStandardDelivery(this.purchase.product);
    }
}

function createDelivery(purchase: Purchase): Delivery {
    if (purchase.deliveryType === 'express') {
        return new ExpressDelivery(purchase);
    } else if (purchase.deliveryType === 'insured') {
        return new InsuredDelivery(purchase);
    } else {
        return new StandardDelivery(purchase);
    }
}

let delivery: Delivery = createDelivery({ deliveryType: 'express' });

delivery.deliverProduct();
