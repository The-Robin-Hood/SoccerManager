import EditableText from "@components/common/EditableText";
import Navbar from "@components/custom/Navbar.tsx";
import { faBars, faUsersLine } from "@components/common/Icons";
import { useState } from "react";
import SearchBar from "@components/custom/SearchBar";
import ImporterDialog from "@components/custom/ImporterDialog";
import RosterTable from "@components/custom/RosterTable";
import FormationView from "@components/custom/FormationView";

function App() {
  const [currentActiveNav, setCurrentActiveNav] = useState(0);
  const [searchPlayer, setSearchPlayer] = useState("");
  const [importDialog, setImportDialog] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  return (
    <div className="flex h-screen w-screen">
      <Navbar
        currentActiveNav={currentActiveNav}
        setCurrentActiveNav={setCurrentActiveNav}
        navIcons={[faBars, faUsersLine]}
        tooltips={["Roster", "Formation"]}
      />
      <main className="flex flex-col p-10 w-full gap-6">
        <header className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="text-primary text-xs font-medium">
              {currentActiveNav === 0 ? "Roster Details" : "Formation Overview"}
            </p>

            <EditableText
              initialText="My Team"
              textClassName="text-[18px] font-semibold"
            />
          </div>
          {currentActiveNav === 0 && (
            <div className="flex gap-2">
              <SearchBar
                searchText={searchPlayer}
                setSearchText={setSearchPlayer}
              />
              <ImporterDialog
                dialogOpen={importDialog}
                setDialogOpen={setImportDialog}
                setPlayers={setPlayers}
              />
            </div>
          )}
        </header>
        {currentActiveNav === 0 && (
          <RosterTable
            {...{ players, setPlayers, searchPlayer, setImportDialog }}
          />
        )}
        {currentActiveNav === 1 && <FormationView {...{ players }} />}
      </main>
    </div>
  );
}

export default App;
