declare const env: {
	readonly isDev: boolean;
	readonly isServer: boolean;
	readonly isMain: boolean;
	readonly isApp: boolean;
};

declare type DbTestItem = {
	_id?: string;
	title: string;
	text: string;
};
