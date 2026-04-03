import type {
  AbstractPowerSyncDatabase,
  PowerSyncBackendConnector,
} from "@powersync/web";

export default class BackendConnector implements PowerSyncBackendConnector {
  private readonly powersyncUrl: string | undefined;
  private readonly powersyncToken: string | undefined;

  constructor(
    powersyncUrl: string | undefined,
    powersyncToken: string | undefined
  ) {
    this.powersyncUrl = powersyncUrl;
    this.powersyncToken = powersyncToken;
  }

  fetchCredentials() {
    // TODO: Use an authentication service or custom implementation here.
    if (this.powersyncToken == null || this.powersyncUrl == null) {
      return Promise.resolve(null);
    }

    return Promise.resolve({
      endpoint: this.powersyncUrl,
      token: this.powersyncToken,
    });
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    try {
      // TODO: Upload here

      await transaction.complete();
    } catch (error: unknown) {
      if (shouldDiscardDataOnError(error)) {
        // Instead of blocking the queue with these errors, discard the (rest of the) transaction.
        //
        // Note that these errors typically indicate a bug in the application.
        // If protecting against data loss is important, save the failing records
        // elsewhere instead of discarding, and/or notify the user.
        console.error("Data upload error - discarding", error);
        await transaction.complete();
      } else {
        // Error may be retryable - e.g. network error or temporary server error.
        // Throwing an error here causes this call to be retried after a delay.
        throw error;
      }
    }
  }
}

function shouldDiscardDataOnError(_error: unknown) {
  // TODO: Ignore non-retryable errors here
  return false;
}
