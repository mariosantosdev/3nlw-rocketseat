import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/Landing'
import OrphanagesPage from './pages/OrphanagesMap'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={LandingPage} exact />
                <Route path='/orfanatos' component={OrphanagesPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;