export class User {
    deviceId: string;
    pseudo: string;
    points: number;
    avatar: string;
    minTime: number;
    click: number;

    constructor();
    constructor(deviceId: string, pseudo: string, points: number, avatar: string, minTime: number, click: number);
    constructor(deviceId?: string, pseudo?: string, points?: number, avatar?: string, minTime?: number, click?: number) {
        this.deviceId = deviceId;
        this.pseudo = pseudo;
        this.points = points;
        this.avatar = avatar;
        this.minTime = minTime;
        this.click = click;
    }
}
