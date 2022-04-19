import { TableStatusGridRow } from "../TableStatuses/TableStatusGridRow";
import { WaiterGridRow } from "../Waiters/WaiterGridRow";

export interface TableGridRow {
    id: number;
    createdDateTime: Date;
    modfiedDateTime: Date;
    orderNrPortions: number,
    ordersDescription: string;

    waiter:WaiterGridRow;

    tableStatus:TableStatusGridRow;
  }
