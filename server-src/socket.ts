export class Socket extends WebSocket {
	private _reconnectDelay: number;
	private _url: string;

	constructor(url) {
		super(url);
		this._url = url;
		this._reconnectDelay = 1000;

		this.addEventListener("close", () => {
			setTimeout(() => {
				this._reconnect();
			}, this._reconnectDelay);
		});

		this.addEventListener("error", () => {
			setTimeout(() => {
				this._reconnect();
			}, this._reconnectDelay);
		});
	}

	_reconnect() {
		this.close();
		const newSocket = new Socket(this._url);
		Object.setPrototypeOf(this, Object.getPrototypeOf(newSocket));
		Object.assign(this, newSocket);
	}
}
