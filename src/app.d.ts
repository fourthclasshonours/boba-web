declare namespace App {
  interface Shop {
    title: string;
    address: string;
    chain: string;
    phone?: string;
    opening_hours?: string;
    location: {
      type: 'Point';
      coordinates: number[];
    };
  }
}
