type Event = { name: string; callback: Function };
let events: Event[] = [];

export const on = (name: string, callback: Function) => {
	events.push({ name, callback });
};

export const emit = (name: string, data: any) => {
	events
		.filter((event) => event.name === name)
		.forEach((event) => event.callback(data));
};
