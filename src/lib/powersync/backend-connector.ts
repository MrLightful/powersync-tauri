import {
    AbstractPowerSyncDatabase,
    PowerSyncBackendConnector
} from '@powersync/web'

export default class BackendConnector implements PowerSyncBackendConnector {
    constructor(
        private readonly powersyncUrl: string | undefined,
        private readonly powersyncToken: string | undefined
    ) {}

    async fetchCredentials() {
        // TODO: Use an authentication service or custom implementation here.
        if (this.powersyncToken == null || this.powersyncUrl == null) {
            return null
        }

        return {
            endpoint: this.powersyncUrl,
            token: this.powersyncToken
        }
    }

    async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
        const transaction = await database.getNextCrudTransaction()

        if (!transaction) {
            return
        }

        try {
            // TODO: Upload here

            await transaction.complete()
        } catch (error: any) {
            if (shouldDiscardDataOnError(error)) {
                // Instead of blocking the queue with these errors, discard the (rest of the) transaction.
                //
                // Note that these errors typically indicate a bug in the application.
                // If protecting against data loss is important, save the failing records
                // elsewhere instead of discarding, and/or notify the user.
                console.error(`Data upload error - discarding`, error)
                await transaction.complete()
            } else {
                // Error may be retryable - e.g. network error or temporary server error.
                // Throwing an error here causes this call to be retried after a delay.
                throw error
            }
        }
    }
}

// @ts-ignore
function shouldDiscardDataOnError(error: any) {
    // TODO: Ignore non-retryable errors here
    return false
}
