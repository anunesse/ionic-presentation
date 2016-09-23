export class User {
    pseudo: string;
    deviceId: string;
    avatar: number;
    deviceProperties: string;

    minTime: number = 10000;
    points: number = 0;
    click: number = 0;
}