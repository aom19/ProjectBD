class Car {
  constructor(
    _id,
    make,
    model,
    description,
    mileage,
    transmision,
    seats,
    luggage,
    fuel,
    airConditions,
    GPS,
    childSeat,
    music,
    seatBelts,
    sleepingBed,
    water,
    bluetooth,
    onBoardComputer,
    audioInput,
    carKit,
    remoteLocking,
    climateControl,
    price,
    urlImage
  ) {
    this.price = price;
    this.urlImage = urlImage;
    this._id = _id;
    this.make = make;
    this.model = model;
    this.description = description;
    this.mileage = mileage;
    this.transmision = transmision;
    this.seats = seats;
    this.luggage = luggage;
    this.fuel = fuel;
    this.airConditions = airConditions;
    this.GPS = GPS;
    this.childSeat = childSeat;
    this.music = music;
    this.seatBelts = seatBelts;
    this.sleepingBed = sleepingBed;
    this.water = water;
    this.bluetooth = bluetooth;
    this.onBoardComputer = onBoardComputer;
    this.audioInput = audioInput;
    this.carKit = carKit;
    this.remoteLocking = remoteLocking;
    this.climateControl = climateControl;
  }
}

export default Car;
