import crc from "crc";
import moment from "moment";

export class SNP {
  DstSrc: {
    uP: number;
    USB: number;
    WizNet: number;
    Server: number;
    RF: number;
    upFlash: number;
    dataEEPROM: number;
    configEEPROM: number;
    Broadcast: number;
  };
  PacketType: {
    Raw: number;
    SensorData: number;
    SensorRegistration: number;
    StatusInfo: number;
    SensorDataWithType: number;
    SensorGroupRegistration: number;
    CommandSet: number;
    Answer: number;
    Error: number;
    ErrorEEPROMData: number;
    BootloaderCommandSet: number;
    BootloaderAnswer: number;
    Data3rdParty: number;
    Misc: number;
    RawRFSniffer: number;
    Development: number;
  };
  GlobalValues: {
    Low: number;
    Off: number;
    High: number;
    On: number;
    Ack: number;
    NAck: number;
  };
  InfoBlock: {
    DataType: {
      SensorInfo: number;
      SensorGroupInfo: number;
      GSMInfo: number;
      TCUAPI: number;
      MoodBoxAPI: number;
      LokeGateway: number;
      FullDataBlock: number;
    };
    GSMInfo: {
      PINPortPUK: number;
      APN: number;
      TCPServer1: number;
      TCPServer2: number;
    };
    LokeGateway: { LocationCode: number };
  };
  SensorTypes: {
    InOut: number;
    CounterA: number;
    CounterB: number;
    TempBat: number;
    Proximity: number;
    PresenceInSecs: number;
    Contact1: number;
    Contact2: number;
    Contact3: number;
    Contact4: number;
    Contact5: number;
    Contact6: number;
    Contact7: number;
    Contact8: number;
    MoodBox: number;
    Temperature: number;
    Humidity: number;
    CO2: number;
    VOCCO2Eq: number;
    VOCTotal: number;
  };
  DevDataTypes: {
    ReservedSNPSensorTypes: number[];
    Reserved: number[];
    Developer1: number[]; //Remko
    Developer2: number[]; //Arno
    Developer3: number[]; //Ronald
    Developer4: number[]; //Sven
    Developer5: number[]; //Erik
    MoodBoxHeartBeat: number;
    VOCCO2Eq: number;
    CO2: number;
    kWh: number;
  };
  uP: {
    Functions: {
      ReadSNGInfo: number;
      ReadSensorInfo: number;
      WizNet: number;
      ServerInterface: number;
      DataEEPROM: number;
      RTC: number;
      P2PWireless: number;
      ConnectionMode: number;
      ResetSNG: number;
    };
    ResetMode: {
      toApp: number;
      toBootLoader: number;
      factoryReset: number;
      resetMRF: number;
    };
    ConnectionModeObjects: { USB: number; Ethernet: number };
    ConnectionModeOptions: {
      onPing: number;
      onData: number;
      onError: number;
      onDataError: number;
      onAllCommunication: number;
    };
    WizNetCommands: {
      HWSwitch: number;
      Reset: number;
      UARTMODE: number;
      CommandMode: number;
    };
    WizNetUARTMode: { Ethernet: number; WizNet: number };
    DataEEPROMCommands: {
      ReadInfo: number;
      SetPutPointer: number;
      SetGetPointer: number;
      SetGetEthPointer: number;
      SetInfoNPages: number;
      IncreasePointer: number;
      IncreaseEthPointer: number;
      DecreasePointer: number;
      DecreaseEthPointer: number;
      SetUSBGetPointer: number;
      IncreaseUSBPointer: number;
      DecreaseUSBPointer: number;
    };
    RTCCommands: { ReadRTC: number; WriteRTC: number };
    P2PWirelessCommands: {
      PairMode: number;
      NodeList: number;
      GetNode: number;
      RemoveNode: number;
    };
    cmdWizNetCommandMode: (onOff: any) => any[];
    cmdDataEEPROMReadInfo: () => any[];
    cmdSetReadPointer: (page: any) => any[];
    cmdSetWritePointer: (page: any) => any[];
    cmdSetUSBReadPointer: (page: any) => any[];
    cmdIncreaseReadPointer: () => any[];
    cmdDecreaseReadPointer: () => any[];
    cmdIncreaseUSBReadPointer: () => any[];
    cmdDecreaseUSBReadPointer: () => any[];
    cmdSetInfoBlockPages: (
      nPages: //Remko
      any
    ) => any[];
    cmdSensorRegistration: (OnOff: any) => any[];
    cmdReadSNGInfo: () => any[];
    cmdReadSensorInfo: () => any[];
    cmdRemoveNode: (nodeIndex: any) => any[];
    cmdGetNode: (nodeIndex: any) => any[];
    cmdGetClock: () => any[];
    cmdSetClock: (datetime: any) => any[];
    cmdSetClockToUTC: () => any[];
    cmdConnectionMode: (destination: any, mode: any) => any[];
    cmdReset: (mode: any) => any[];
  };
  ConfigEEPROM: {
    Commands: { Read: number; Write: number };
    cmdRead(address: number, readLength: number): any[];
    cmdWrite(address: number, pageData: number[]): any[];
    cmdGetNodeId(): number[];
  };
  DataEEPROM: {
    Commands: {
      InfoRead: number;
      InfoWrite: number;
      DataRead: number;
      DataWrite: number;
      SNPRead: number;
      Erase: number;
    };
    InfoBlockDataType: {
      SensorInfo: number;
      SensorGroupInfo: number;
      LokeInfo: number;
    };
    cmdInfoRead(address: number): any[];
    cmdInfoWrite(address: number, pageData: number[]): any[];
    cmdDataRead(address: number): any[];
    cmdDataWrite(address: number, pageData: number[]): any[];
  };
  uPFlash: {
    Commands: {
      BootLoaderInfo: number;
      BootLoaderInfoOff: number;
      UnlockConfig: number;
      EraseDevice: number;
      ProgramDevice: number;
      ProgramComplete: number;
      ResetToBootLoader: number;
      ResetToApp: number;
      CRCCheck: number;
      ProgramDeviceEnc: number;
    };
    cmdBootLoaderInfo: () => any[];
    cmdBootLoaderInfoOff: () => any[];
    cmdUnlockConfig: () => any[];
    cmdEraseDevice: () => any[];
    cmdProgramDevice: (
      address: number,
      len: number,
      programData: number[]
    ) => any[];
    cmdProgramDeviceEncrypted: (
      address: number,
      len: number,
      encryptedData: number[]
    ) => any[];
    cmdProgramComplete: () => any[];
    cmdResetToBootLoader: () => any[];
    cmdResetToApp: () => any[];
  };

  constructor() {
    this.DstSrc = {
      uP: 0x0,
      USB: 0x1,
      WizNet: 0x2,
      Server: 0x3,
      RF: 0x4,
      upFlash: 0x5,
      dataEEPROM: 0x6,
      configEEPROM: 0x7,
      Broadcast: 0xf,
    };

    this.PacketType = {
      Raw: 0x00,
      SensorData: 0x01,
      SensorRegistration: 0x02,
      StatusInfo: 0x03,
      SensorDataWithType: 0x04,
      SensorGroupRegistration: 0x05,
      CommandSet: 0x10,
      Answer: 0x11,
      Error: 0x20,
      ErrorEEPROMData: 0x21,
      BootloaderCommandSet: 0x30,
      BootloaderAnswer: 0x31,
      Data3rdParty: 0x80,
      Misc: 0x99,
      RawRFSniffer: 0xf0,
      Development: 0xfe,
    };

    this.GlobalValues = {
      Low: 0x00,
      Off: 0x00,
      High: 0x01,
      On: 0x01,
      Ack: 0x06,
      NAck: 0x15,
    };

    this.InfoBlock = {
      DataType: {
        SensorInfo: 0x00,
        SensorGroupInfo: 0x01,
        GSMInfo: 0x02,
        TCUAPI: 0xa0,
        MoodBoxAPI: 0xa1,
        LokeGateway: 0xa2,
        FullDataBlock: 0xfe,
      },
      GSMInfo: {
        PINPortPUK: 0x01,
        APN: 0x02,
        TCPServer1: 0x03,
        TCPServer2: 0x04,
        //Username			: 0x05, //Not Implemented
        //Password			: 0x06, //Not Implemented
      },
      LokeGateway: {
        LocationCode: 0x01,
      },
    };

    this.SensorTypes = {
      InOut: 0x01,
      CounterA: 0x02,
      CounterB: 0x03,
      TempBat: 0x04,
      Proximity: 0x05,
      PresenceInSecs: 0x06,
      Contact1: 0x10,
      Contact2: 0x11,
      Contact3: 0x12,
      Contact4: 0x13,
      Contact5: 0x14,
      Contact6: 0x15,
      Contact7: 0x16,
      Contact8: 0x17,
      MoodBox: 0x18,
      Temperature: 0x20,
      Humidity: 0x21,
      CO2: 0x22,
      VOCCO2Eq: 0x23,
      VOCTotal: 0x24,
    };

    this.DevDataTypes = {
      ReservedSNPSensorTypes: [0x0000, 0x00ff],
      Reserved: [0x0100, 0xf0ff],
      Developer1: [0xf100, 0xf1ff], //Remko
      Developer2: [0xf200, 0xf2ff], //Arno
      Developer3: [0xf300, 0xf3ff], //Ronald
      Developer4: [0xf400, 0xf4ff], //Sven
      Developer5: [0xf500, 0xf5ff], //Erik
      MoodBoxHeartBeat: 0x0118,
      VOCCO2Eq: 0xf400,
      CO2: 0xf401,
      kWh: 0xf402,
    };

    this.uP = {
      Functions: {
        ReadSNGInfo: 0x00,
        ReadSensorInfo: 0x00,
        WizNet: 0x01,
        ServerInterface: 0x01,
        DataEEPROM: 0x02,
        RTC: 0x03,
        P2PWireless: 0x04,
        ConnectionMode: 0x05,
        ResetSNG: 0x06,
      },
      ResetMode: {
        toApp: 0x00,
        toBootLoader: 0x01,
        factoryReset: 0x02,
        resetMRF: 0x03,
      },
      ConnectionModeObjects: {
        USB: 0x01,
        Ethernet: 0x02,
      },
      ConnectionModeOptions: {
        onPing: 0x00,
        onData: 0x01,
        onError: 0x02,
        onDataError: 0x03,
        onAllCommunication: 0x04,
      },
      WizNetCommands: {
        HWSwitch: 0x01,
        Reset: 0x02,
        UARTMODE: 0x03,
        CommandMode: 0x05,
      },
      WizNetUARTMode: {
        Ethernet: 0x00,
        WizNet: 0x01,
      },
      DataEEPROMCommands: {
        ReadInfo: 0x01,
        SetPutPointer: 0x02,
        SetGetPointer: 0x03,
        SetGetEthPointer: 0x03,
        SetInfoNPages: 0x04,
        IncreasePointer: 0x05,
        IncreaseEthPointer: 0x05,
        DecreasePointer: 0x06,
        DecreaseEthPointer: 0x06,
        SetUSBGetPointer: 0x07,
        IncreaseUSBPointer: 0x08,
        DecreaseUSBPointer: 0x09,
      },
      RTCCommands: {
        ReadRTC: 0x01,
        WriteRTC: 0x02,
      },
      P2PWirelessCommands: {
        PairMode: 0x01,
        NodeList: 0x02,
        GetNode: 0x03,
        RemoveNode: 0x04,
      },
      cmdWizNetCommandMode: (onOff) => {
        let data = [];
        data.push(this.uP.Functions.WizNet);
        data.push(this.uP.WizNetCommands.CommandMode);
        data.push(onOff);
        return data;
      },
      cmdDataEEPROMReadInfo: () => {
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.ReadInfo);
        return data;
      },
      cmdSetReadPointer: (page) => {
        page = 0xffff;
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.SetGetPointer);
        data.push(page >> 8);
        data.push(page & 0x00ff);
        return data;
      },
      cmdSetWritePointer: (page) => {
        page = page & 0xffff;
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.SetPutPointer);
        data.push(page >> 8);
        data.push(page & 0x00ff);
        return data;
      },
      cmdSetUSBReadPointer: (page) => {
        page = page & 0xffff;
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.SetUSBGetPointer);
        data.push(page >> 8);
        data.push(page & 0x00ff);
        return data;
      },
      cmdIncreaseReadPointer: () => {
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.IncreasePointer);
        return data;
      },
      cmdDecreaseReadPointer: () => {
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.DecreasePointer);
        return data;
      },
      cmdIncreaseUSBReadPointer: () => {
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.IncreaseUSBPointer);
        return data;
      },
      cmdDecreaseUSBReadPointer: () => {
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.DecreaseUSBPointer);
        return data;
      },
      cmdSetInfoBlockPages: (nPages) => {
        nPages = nPages & 0xffff;
        let data = [];
        data.push(this.uP.Functions.DataEEPROM);
        data.push(this.uP.DataEEPROMCommands.SetInfoNPages);
        data.push(nPages >> 8);
        data.push(nPages & 0x00ff);
        return data;
      },
      cmdSensorRegistration: (OnOff) => {
        let data = [];
        data.push(this.uP.Functions.P2PWireless);
        data.push(this.uP.P2PWirelessCommands.PairMode);
        data.push(OnOff);
        return data;
      },
      cmdReadSNGInfo: () => {
        let data = [];
        data.push(this.uP.Functions.ReadSNGInfo);
        return data;
      },
      cmdReadSensorInfo: () => {
        let data = [];
        data.push(this.uP.Functions.ReadSensorInfo);
        return data;
      },
      cmdRemoveNode: (nodeIndex) => {
        nodeIndex = nodeIndex & 0xff;
        let data = [];
        data.push(this.uP.Functions.P2PWireless);
        data.push(this.uP.P2PWirelessCommands.RemoveNode);
        data.push(nodeIndex);
        return data;
      },
      cmdGetNode: (nodeIndex) => {
        nodeIndex = nodeIndex & 0xff;
        let data = [];
        data.push(this.uP.Functions.P2PWireless);
        data.push(this.uP.P2PWirelessCommands.GetNode);
        data.push(nodeIndex);
        return data;
      },
      cmdGetClock: () => {
        let data = [];
        data.push(this.uP.Functions.RTC);
        data.push(this.uP.RTCCommands.ReadRTC);
        return data;
      },
      cmdSetClock: (_datetime: number) => {
        let data: any[] = [];
        return data;
      },
      cmdSetClockToUTC: () => {
        let data = [];
        data.push(this.uP.Functions.RTC);
        data.push(this.uP.RTCCommands.WriteRTC);
        data.push(this.bcd(moment.utc().year() - 2000));
        data.push(this.bcd(moment.utc().month() + 1));
        data.push(this.bcd(moment.utc().date()));
        data.push(this.bcd(moment.utc().hour()));
        data.push(this.bcd(moment.utc().minute()));
        data.push(this.bcd(moment.utc().second()));
        return data;
      },
      cmdConnectionMode: (destination, mode) => {
        let data = [];
        data.push(this.uP.Functions.ConnectionMode);
        data.push(destination);
        data.push(mode);
        return data;
      },
      cmdReset: (mode) => {
        let data = [];
        data.push(this.uP.Functions.ResetSNG);
        data.push(mode);
        return data;
      },
    };

    this.DataEEPROM = {
      Commands: {
        InfoRead: 0x01,
        InfoWrite: 0x02,
        DataRead: 0x03,
        DataWrite: 0x04,
        SNPRead: 0x05,
        Erase: 0x06,
      },
      InfoBlockDataType: {
        SensorInfo: 0x00,
        SensorGroupInfo: 0x01,
        LokeInfo: 0xa2,
      },
      cmdInfoRead: (address: number) => {
        let data = [];
        data.push(this.DataEEPROM.Commands.InfoRead);
        data.push(address >> 8);
        data.push(address & 0x00ff);

        return data;
      },
      cmdInfoWrite: (address: number, pageData: number[]) => {
        let data = new Array(35);

        data[0] = this.DataEEPROM.Commands.InfoWrite;
        data[1] = address >> 8;
        data[2] = address && 0x00ff;

        for (let i = 0; i < 32; i++) {
          if (i < pageData.length) {
            data[i + 3] = pageData[i];
          } else {
            data[i + 3] = 0xff;
          }
        }

        return data;
      },
      cmdDataRead: (address: number) => {
        let data = [];

        data.push(this.DataEEPROM.Commands.DataRead);
        data.push(address >> 8);
        data.push(address & 0x00ff);

        return data;
      },
      cmdDataWrite: (address: number, pageData: number[]) => {
        let data = new Array(35);

        data[0] = this.DataEEPROM.Commands.DataWrite;
        data[1] = address >> 8;
        data[2] = address & 0x00ff;

        for (let i = 0; i < 32; i++) {
          if (i < pageData.length) {
            data[i + 3] = pageData[i];
          } else {
            data[i + 3] = 0xff;
          }
        }

        return data;
      },
    };

    this.ConfigEEPROM = {
      Commands: {
        Read: 0x01,
        Write: 0x02,
      },
      cmdRead: (address: number, readLength: number) => {
        let data = [];

        data.push(this.ConfigEEPROM.Commands.Read);
        data.push(address & 0xff);
        data.push(readLength & 0xff);

        return data;
      },
      cmdWrite: (address: number, pageData: number[]) => {
        let data = [];

        data.push(this.ConfigEEPROM.Commands.Write);
        data.push(address & 0xff);
        data.push(pageData.length & 0xff);

        for (let i = 0; i < pageData.length; i++) {
          data.push(pageData[i] & 0xff);
        }

        return data;
      },
      cmdGetNodeId: () => {
        let data = [];
        data.push(0x01);
        data.push(0xfa);
        data.push(0x06);

        return data;
      },
    };

    this.uPFlash = {
      Commands: {
        BootLoaderInfo: 0x01,
        BootLoaderInfoOff: 0x02,
        UnlockConfig: 0x03,
        EraseDevice: 0x04,
        ProgramDevice: 0x05,
        ProgramComplete: 0x06,
        ResetToBootLoader: 0x07,
        ResetToApp: 0x08,
        CRCCheck: 0x09,
        ProgramDeviceEnc: 0x0a,
      },
      cmdBootLoaderInfo: () => {
        let data = [];
        data.push(this.uPFlash.Commands.BootLoaderInfo);
        return data;
      },
      cmdBootLoaderInfoOff: () => {
        let data = [];
        data.push(this.uPFlash.Commands.BootLoaderInfoOff);
        return data;
      },
      cmdUnlockConfig: () => {
        let data = [];
        data.push(this.uPFlash.Commands.UnlockConfig);
        return data;
      },
      cmdEraseDevice: () => {
        let data = [];
        data.push(this.uPFlash.Commands.EraseDevice);
        return data;
      },
      cmdProgramDevice: (
        address: number,
        len: number,
        programData: number[]
      ) => {
        let data = new Array(programData.length + 6);

        data[0] = this.uPFlash.Commands.ProgramDevice;
        data[1] = address >> 24;
        data[2] = address >> 16;
        data[3] = address >> 8;
        data[4] = address & 0x000000ff;
        data[5] = len & 0xff;

        for (let i = 0; i < programData.length; i++) {
          data[i + 6] = programData[i];
        }

        return data;
      },
      cmdProgramDeviceEncrypted: (
        address: number,
        len: number,
        encryptedData: number[]
      ) => {
        let data = new Array(encryptedData.length + 6);

        data[0] = this.uPFlash.cmdProgramDeviceEncrypted;
        data[1] = address >> 24;
        data[2] = address >> 16;
        data[3] = address >> 8;
        data[4] = address & 0x000000ff;
        data[5] = len & 0xff;

        for (let i = 0; i < encryptedData.length; i++) {
          data[i + 6] = encryptedData[i];
        }

        return data;
      },
      cmdProgramComplete: () => {
        let data = [];
        data.push(this.uPFlash.Commands.ProgramComplete);
        return data;
      },
      cmdResetToBootLoader: () => {
        let data = [];
        data.push(this.uPFlash.Commands.ResetToBootLoader);
        return data;
      },
      cmdResetToApp: () => {
        let data = [];
        data.push(this.uPFlash.Commands.ResetToApp);
        return data;
      },
    };
  }

  bcd(dec: number) {
    return ((dec / 10) << 4) + (dec % 10);
  }

  unbcd(bcd: number) {
    return (bcd >> 4) * 10 + (bcd % 16);
  }

  CreatePacket(dst: number, src: number, type: number, payload: Buffer) {
    let packet = Buffer.alloc(payload.length + 3);

    payload = Buffer.from(payload);

    packet[0] = dst * 0x10 + src;
    packet[1] = type;
    packet[2] = payload.length;

    for (let i = 0; i < payload.length; i++) {
      packet[3 + i] = payload[i];
    }

    packet = this.addCRC(packet);

    return packet;
  }

  addCRC(packet: Buffer) {
    let crcInt = crc.crc16xmodem(packet);
    let crcBuffer = Buffer.alloc(2);

    crcBuffer.writeUInt16LE(crcInt);
    packet = Buffer.from(packet);

    return Buffer.concat([packet, crcBuffer]);
  }

  checkCRC(packet: Buffer) {
    let packetCRC = packet.readUInt16LE(packet.length - 2);
    let calculatedCRC = crc.crc16xmodem(packet.slice(0, packet.length - 2));

    if (packetCRC == calculatedCRC) {
      return true;
    }

    return false;
  }

  ParsePacket(packet: Buffer, returnPacket: boolean) {
    let parsedPacket: any = {
      validPacket: false,
      package: null,
    };

    if (returnPacket === true) {
      parsedPacket.packet = packet;
    }

    if (packet.length < 5) return parsedPacket;

    parsedPacket.validPacket = this.checkCRC(packet);
    if (parsedPacket.validPacket === false) return parsedPacket;

    parsedPacket.destination = packet[0] >> 4;
    parsedPacket.source = packet[0] & 0x0f;
    parsedPacket.packetType = packet[1];
    parsedPacket.dataLength = packet[2];

    parsedPacket.data = [];
    for (let i = 0; i < parsedPacket.dataLength; i++) {
      parsedPacket.data.push(packet[i + 3]);
    }

    parsedPacket = this.ParseData(parsedPacket);

    parsedPacket.validPacket = true;
    return parsedPacket;
  }

  ParseData(parsedPacket: any) {
    let parsedData: any = {};

    switch (parsedPacket.source) {
      case this.DstSrc.uP:
        //EEPROM Read Info Result
        if (
          parsedPacket.packetType == this.PacketType.Answer &&
          parsedPacket.data[0] == this.uP.Functions.DataEEPROM &&
          parsedPacket.data[1] == this.uP.DataEEPROMCommands.ReadInfo
        ) {
          parsedData.content = "eeprominfo";
          parsedData.readPointer = 0;
          parsedData.writePointer = 0;
          parsedData.infoBlockSize = 0x20 * 0x20;
          break;
        }

        if (
          parsedPacket.packetType == this.PacketType.Answer &&
          parsedPacket.data[0] == this.uP.Functions.ReadSNGInfo
        ) {
          parsedData.content = "snginfo";
          parsedData.version =
            "v" +
            parsedPacket.data[1] +
            "." +
            parsedPacket.data[2] +
            "." +
            parsedPacket.data[3];
          if (parsedPacket.data.length > 4) {
            parsedData.maxNodes = parsedPacket.data[4];
          }
          if (parsedPacket.data.length > 6) {
            //data[6] = rftype
            switch (parsedPacket.data[6]) {
              case 0x24:
                parsedData.RFType = "2.4GHz";
                break;
              case 0x89:
                parsedData.RFType = "868MHz";
                break;
              case 0x91:
                parsedData.RFType = "915MHz";
                break;
              default:
                parsedData.RFType = "Not available";
                break;
            }

            //data[7] = interface type
            switch (parsedPacket.data[7]) {
              case 0x00:
                parsedData.interface = "RS232";
                break;
              case 0x01:
                parsedData.interface = "Ethernet";
                break;
              case 0x02:
                parsedData.interface = "2G/3G";
                break;
              case 0x04:
                parsedData.interface = "4G";
                break;
              case 0x10:
                parsedData.interface = "USB";
                break;
              case 0xff:
                parsedData.interface = "Ethernet";
                break;
            }
          }
        }

        if (
          parsedPacket.packetType == this.PacketType.Answer &&
          parsedPacket.data[0] == this.uP.Functions.RTC &&
          parsedPacket.data[1] == this.uP.RTCCommands.ReadRTC
        ) {
          parsedData.content = "clockinfo";
          let datetime = moment.utc();
          datetime.year(2000 + this.unbcd(parsedPacket.data[2]));
          datetime.month(this.unbcd(parsedPacket.data[3]) - 1);
          datetime.date(this.unbcd(parsedPacket.data[4]));
          datetime.hour(this.unbcd(parsedPacket.data[5]));
          datetime.minute(this.unbcd(parsedPacket.data[6]));
          datetime.second(this.unbcd(parsedPacket.data[7]));
          datetime.millisecond(0);
          parsedData.datetime = datetime.format();
        }

        if (
          parsedPacket.packetType == this.PacketType.Answer &&
          parsedPacket.data[0] == this.uP.Functions.P2PWireless &&
          parsedPacket.data[1] == this.uP.P2PWirelessCommands.GetNode
        ) {
          parsedData.content = "nodeinfo";
          parsedData.nodeIndex = parsedPacket.data[2];
          parsedData.nodeActive = parsedPacket.data[3] == 0x01 ? true : false;
          parsedData.nodeId = Buffer.from(
            parsedPacket.data.slice(4, 11)
          ).toString("hex");
        }

        break;
      case this.DstSrc.dataEEPROM:
        if (parsedPacket.packetType == this.PacketType.SensorData) {
          parsedData.content = "sensordata";
          // let year = this.unbcd(parsedPacket.data[0]);
          // let month = this.unbcd(parsedPacket.data[1]);
          // let day = this.unbcd(parsedPacket.data[2]);
          // let hour = this.unbcd(parsedPacket.data[3]);
          // let minute = this.unbcd(parsedPacket.data[4]);
          // let second = this.unbcd(parsedPacket.data[5]);
          // parsedData.datetime = `${year} ${month} ${day} ${hour} ${minute} ${second}`;

          let datetime = moment.utc();
          datetime.year(2000 + this.unbcd(parsedPacket.data[0]));
          datetime.month(this.unbcd(parsedPacket.data[1]) - 1);
          datetime.date(this.unbcd(parsedPacket.data[2]));
          datetime.hour(this.unbcd(parsedPacket.data[3]));
          datetime.minute(this.unbcd(parsedPacket.data[4]));
          datetime.second(this.unbcd(parsedPacket.data[5]));
          datetime.millisecond(0);
          parsedData.datetime = datetime.format();

          parsedData.nodeIndex = parsedPacket.data[6];
          parsedData.nodeId = Buffer.from(
            parsedPacket.data.slice(7, 13)
          ).toString("hex");
          parsedData.rssi = parsedPacket.data[13];
          parsedData.data = parsedPacket.data.slice(
            14,
            parsedPacket.data.length - 1
          );
          parsedData.sequence = parsedPacket.data[parsedPacket.data.length - 1];
        }

        break;
      case this.DstSrc.Server:
        break;
      case this.DstSrc.configEEPROM:
        if (
          parsedPacket.packetType == this.PacketType.Answer &&
          parsedPacket.data[0] == 0x01 &&
          parsedPacket.data[1] == 0xfa
        ) {
          parsedData.content = "nodeid";
          parsedData.nodeId = Buffer.from(parsedPacket.data.slice(3)).toString(
            "hex"
          );
        }
        break;
      case this.DstSrc.RF:
        break;
    }

    parsedPacket.parsedData = parsedData;
    return parsedPacket;
  }
}
