import { ItemFactura } from './item-factura';
import { Cliente } from './cliente';

export class Factura {

    id: number;
    descripcion: string;
    observacion: string;
    items: ItemFactura[] = [];
    cliente: Cliente;
    total: number;
    createAt: string;

    public calcularGranTotal(): number{
        this.total = 0;
        this.items.forEach((item:ItemFactura) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}