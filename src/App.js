import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import MapWrapper from './MapWrapper'
import OrganizationUnits from './OrganizationUnits'

let items = [
    {key:"map", component:<MapWrapper key="map"/>},
    {key:"ou", component:<OrganizationUnits key="ou"/>}
];
const MyApp = () => {
    let [selected, setSelected] = React.useState(() => "map");

    
    return (
        <div className={styles.container}>
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>
                    <MenuItem
                        label={i18n.t('Map')}
                        dataTest="menu-map"
                        onClick={(e) => { setSelected(p => "map")} }
                    />
                    <MenuItem
                        label={i18n.t('OrganizationUnits')}
                        dataTest="menu-ou"
                        onClick={(e) => { setSelected(p => "ou")} }
                    />
                </Menu>
            </nav>
            <main className={styles.main}>
                
                
                { items.map( (item=> {
                    if (item.key == selected ) {
                        return item.component 
                    } 
                }) ) }
            </main>
        </div>
    )
}

export default MyApp
