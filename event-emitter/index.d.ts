import '../namespaces/Micra';
declare global {
    namespace Application {
        interface Events {
        }
    }
    namespace Micra {
        interface EventEmitter<Events extends Record<string, any> = Application.Events> {
            on<EventName extends keyof Events>(event: EventName, listener: (payload: Events[EventName]) => void): UnsubscribeCallback;
            emit<EventName extends keyof Events>(...args: EmitArgs<Events, EventName>): void;
            emitSync<EventName extends keyof Events>(...args: EmitArgs<Events, EventName>): void;
        }
        type UnsubscribeCallback = () => void;
        type EmitArgs<Events extends Record<string, unknown>, EventName extends keyof Events> = Events[EventName] extends never ? never : Events[EventName] extends void ? [event: EventName] : [event: EventName, payload: Events[EventName]];
    }
}
export {};
