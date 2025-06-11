import { useEffect } from "react"
import { readDir } from '@tauri-apps/plugin-fs'
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/SnippetStore";
import SnippetItem from "./SnippetItem";


function SnippetList() {
  const setSnippetNames = useSnippetStore(state => state.setSnippetNames)
  const snippetNames = useSnippetStore(state => state.snippetNames);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir()
      const result = await readDir(`${desktopPath}/taurifiles`)
      const filenames = result.map(file => file.name!)
      setSnippetNames(filenames)
    }
    loadFiles()
  }, [setSnippetNames])

  return (
    <div>
      {snippetNames.length === 0 ? (
        <p className="text-gray-400">No snippets found. Start writing!</p>
      ) : (
        <ul>
          {snippetNames.map((name) => (
            <li key={name}> 
              <SnippetItem snippetName={name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SnippetList