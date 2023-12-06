import { useState } from "react";

import EditableText from "@components/common/EditableText";
import { faBars, faUsersLine } from "@components/common/Icons";
import FormationView from "@components/custom/FormationView";
import ImporterDialog from "@components/custom/ImporterDialog";
import Navbar from "@components/custom/Navbar.tsx";
import RosterTable from "@components/custom/RosterTable";
import SearchBar from "@components/custom/SearchBar";

function App() {
  const [currentActiveNav, setCurrentActiveNav] = useState(0);
  const [searchPlayer, setSearchPlayer] = useState("");
  const [importDialog, setImportDialog] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  return (
    <div className='flex h-screen w-screen'>
      <Navbar
        currentActiveNav={currentActiveNav}
        setCurrentActiveNav={setCurrentActiveNav}
        navIcons={[faBars, faUsersLine]}
        tooltips={["Roster", "Formation"]}
      />
      <main className='flex w-full flex-col gap-6 p-10'>
        <header className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <p className='text-xs font-medium text-primary'>
              {currentActiveNav === 0 ? "Roster Details" : "Formation Overview"}
            </p>
            <EditableText initialText='My Team' textClassName='text-[18px] font-semibold' />
          </div>
          {currentActiveNav === 0 && (
            <div className='flex gap-2'>
              <SearchBar searchText={searchPlayer} setSearchText={setSearchPlayer} />
              <ImporterDialog dialogOpen={importDialog} setDialogOpen={setImportDialog} setPlayers={setPlayers} />
            </div>
          )}
        </header>
        {currentActiveNav === 0 && <RosterTable {...{ players, setPlayers, searchPlayer, setImportDialog }} />}
        {currentActiveNav === 1 && <FormationView {...{ players }} />}
      </main>
    </div>
  );
}

export default App;
