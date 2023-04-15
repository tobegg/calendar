type EventType = 'Public' | 'Bank' | 'School' | 'Authorities' | 'Optional' | 'Observance';

export default interface IEvent {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: EventType[];
}
