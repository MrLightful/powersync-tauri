import './global.css'

import AppProvider from '@/app/provider'
import AppRouter from '@/app/router.tsx'

function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App
