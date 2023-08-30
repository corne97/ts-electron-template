import { ipcRenderer } from "electron";

export namespace HID
{
	export const getDevices = () => ipcRenderer.invoke("get-hid-devices");
	export const getDeviceInfo = (id: number) => ipcRenderer.invoke("get-hid-device-info", id);
}