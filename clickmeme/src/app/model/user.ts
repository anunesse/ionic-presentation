export class User {
    pseudo: string;
    deviceId: string;
    avatar: string;
    deviceProperties: string[] = new Array<string>();

    minTime: number = 10000;
    points: number = 0;
    click: number = 0;
}