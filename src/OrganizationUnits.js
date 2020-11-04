import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import { useDataQuery } from "@dhis2/app-runtime"
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, ModalContent, 
    MenuSectionHeader,
    StackedTable, StackedTableHead, StackedTableRowHead,
    StackedTableCellHead, StackedTableBody, StackedTableRow,
    StackedTableCell, NoticeBox, CircularLoader
   } from '@dhis2/ui'


const query = {
    organisationUnits: {
      resource: "organisationUnits",
      params: {
        paging: false,
        fields: "id,name,created",
      },
    }
  };
const ConfigComponent = () => {
    const { baseUrl, apiVersion } = useConfig();
    const { loading, error, data } = useDataQuery(query);
    console.log(data);
    return <div>
        <span>
            <strong>Base URL</strong> : {baseUrl}
        </span>
        <span>
            <strong>API Version</strong> : {apiVersion}
        </span>
        <div>
        {loading && <CircularLoader/>}
        {error && <NoticeBox error title="Error">{`ERROR: ${error.message}`}</NoticeBox>}
        <div >
            <Menu>
            {data && (
                    <React.Fragment>
                    <MenuSectionHeader label={i18n.t('OrganizationUnits')} />
                    {data.organisationUnits.organisationUnits
                        .map( (program,index) => {
                            return <React.Fragment key={index} >
                                    <MenuItem
                                        dataTest={`list-organisationUnits-${program.id}`} 
                                        label={program.name}
                                        onClick={(_e) => setSelected(_p => program)}
                                    />
                                    </React.Fragment>

                        })}
                    </React.Fragment>
                )}
            </Menu>
          </div>
        </div>
    </div>
}
export default ConfigComponent;