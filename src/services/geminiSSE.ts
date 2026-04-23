export class GeminiSSEService {
  private eventSource: EventSource | null = null;
  private onMessageCallback: ((message: string) => void) | null = null;
  private onErrorCallback: ((error: Event) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;

  private endpoint: string;

  constructor(
    endpoint: string,
    onMessage?: (message: string) => void,
    onError?: (error: Event) => void,
    onComplete?: () => void
  ) {
    this.endpoint = endpoint;
    if (onMessage) this.onMessageCallback = onMessage;
    if (onError) this.onErrorCallback = onError;
    if (onComplete) this.onCompleteCallback = onComplete;
  }

  public connect(params?: Record<string, string>) {
    this.disconnect(); // Ensure no existing connection

    let url = this.endpoint;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
      
      // Optionally handle custom 'done' event if the server sends it
      try {
        const data = JSON.parse(event.data);
        if (data && data.done) {
            this.disconnect();
            if(this.onCompleteCallback) this.onCompleteCallback();
        }
      } catch {
          // Ignore parse errors if data is just a string
      }
    };

    this.eventSource.onerror = (error) => {
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
      // Often, SSE connections will auto-reconnect. 
      // Depending on the server, you might want to close it here if an error means failure.
      // this.disconnect(); 
    };
  }

  public disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  public onMessage(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }

  public onError(callback: (error: Event) => void) {
    this.onErrorCallback = callback;
  }
  
  public onComplete(callback: () => void) {
      this.onCompleteCallback = callback;
  }
}
