import '@/namespaces/Micra';

declare global {
  namespace Application {
    /**
     * This interface describes the events that can be emitted by the framework. The events are defined by setting the event name as the key and the event payload as the value.
     */
    interface Events {}
  }

  namespace Micra {
    /**
     * This interface describes the event emitter that can be used by the framework. The interface accepts a Record describing accepted events and their payloads.
     *
     * @typeParam `Events` - The events that can be emitted by the framework
     */
    interface EventEmitter<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Events extends Record<string, any> = Application.Events,
    > {
      /**
       * This method is used to register an event listener called when the given event is emitted.
       *
       * @param event - The event name.
       * @param listener - The listener to be called when the event is emitted.
       * @returns An unsubscribe function.
       *
       * @typeParam `EventName` - The event name. Inferred from the `event` parameter.
       */
      on<EventName extends keyof Events>(
        event: EventName,
        listener: (payload: Events[EventName]) => void,
      ): UnsubscribeCallback;

      /**
       * This method is used to dispatch an event and call the listeners asynchronously.
       *
       * @param ...args - Tuple of event name and payload.
       *
       * @typeParam `EventName` - The event name. Inferred from the first argument.
       */
      emit<EventName extends keyof Events>(
        ...args: EmitArgs<Events, EventName>
      ): void;

      /**
       * This method is used to dispatch an event and call the listeners synchronously.
       *
       * @param ...args - Tuple of event name and payload.
       *
       * @typeParam `EventName` - The event name. Inferred from the first argument.
       */
      emitSync<EventName extends keyof Events>(
        ...args: EmitArgs<Events, EventName>
      ): void;
    }

    /**
     * Callback function to unsubscribe a listener from an event.
     */
    type UnsubscribeCallback = () => void;

    /**
     * Helper type defining the arguments for the emit methods. This tuple allows TypeScript to correctly infer the payload type from the `Events` parameter and ignore `void` payloads
     *
     * @typeParam `Events` - The events that can be emitted by the framework.
     * @typeParam `EventName` - The event name.
     */
    type EmitArgs<
      Events extends Record<string, unknown>,
      EventName extends keyof Events,
    > = Events[EventName] extends never
      ? never
      : Events[EventName] extends void
      ? [event: EventName]
      : [event: EventName, payload: Events[EventName]];
  }
}

export {};
