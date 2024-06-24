import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { customColors } from '@/styles/custom-theme';


type ColProps = { field: string, headerName: string, renderCell?: (params: GridRenderCellParams) => any }[]
type SdTableProps = {
    colProps: ColProps,
    rowProps: any[],
    rowClickFn?: (row: GridRowParams) => void;
}


export default function SdTable({ colProps, rowProps, rowClickFn }: SdTableProps) {

    const rows: GridRowsProp = rowProps.map((row) => {
        return { ...row as GridRowsProp }
    })


    const columns: GridColDef[] = colProps.map((col) => {
        return { field: col.field, headerName: col.headerName, renderCell: col?.renderCell, flex: 1, }
    })

    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid rows={rows} disableRowSelectionOnClick columns={columns} sx={{

                '& .MuiDataGrid-columnHeaderTitleContainer': {
                    whiteSpace: 'wrap'
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    whiteSpace: 'normal',
                    lineHeight: 'normal'
                },

                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: customColors.secondary,
                    color: customColors.secondaryContrast,
                    textWrap: 'wrap',
                    whiteSpace: 'normal',
                    lineHeight: 'normal',
                },
                '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer'
                },
                '& .MuiDataGrid-cell': {
                    whiteSpace: 'normal',
                    lineHeight: 'normal',
                    wordBreak: 'break-word',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',


                },
                minHeight: '150px'

            }}
                onRowClick={(row) => {
                    rowClickFn && rowClickFn(row)
                }}
            />
        </div>
    );
}
