import { column, Schema, Table } from '@powersync/web'

// TODO: Define your database schema here.
//       For more information, see https://docs.powersync.com/client-sdk-references/js-web#id-1.-define-the-schema
const projects = new Table(
    {
        created_at: column.text,
        name: column.text,
        slug: column.text,
        owner_id: column.text
    },
    { indexes: {} }
)

export const AppSchema = new Schema({
    projects
})

export type Database = (typeof AppSchema)['types']

export const PROJECTS_TABLE = 'projects'
export type ProjectRecord = Database['projects']
