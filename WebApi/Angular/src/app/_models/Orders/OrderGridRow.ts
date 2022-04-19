export interface OrderGridRow {
    id: number;
    orderNrPortions: number,
    ordersDescription: string;

    waiterId: number,
    waiterName: string,

    ordersStatusId: number;
    ordersStatusName: string;

    tableId: number;

    dishesId: number;
    dishName: string;
    
    kitchenerId: number,
    kitchenerName: string;
  }
