import MenuCategory from 'components/MenuCategory'
import GSheetReader from 'g-sheets-api'
import * as lodash from 'lodash'
import React, { useEffect, useState } from 'react'

function useMenus(sheet_id) {
  const [menus, setMenus] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    GSheetReader(
      {
        sheetId: sheet_id,
        sheetNumber: 1,
        returnAllResults: false,
      },
      (results) => setMenus(lodash.groupBy(results, 'category')),
      (error) => setError(error)
    )
  }, [sheet_id])

  return { menus, error }
}

const PreviewMenu = ({ sheetId }) => {
  const { menus } = useMenus(sheetId)

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 py-5 bg-white sm:p-6 h-full p-4 relative">
        <div className="space-y-2 md:absolute inset-0 md:overflow-y-scroll">
          <span className="w-full block sticky top-0 inset-x-0 p-4 bg-gray-100 text-gray-500 text-center text-sm tracking-wider border-b border-gray-300">
            PREVIEW MENU
          </span>
          {Object.keys(menus).map((key) => (
            <MenuCategory categoryName={key} items={menus[key]} key={key} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewMenu
