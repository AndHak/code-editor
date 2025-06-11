import { useSnippetStore } from "../store/SnippetStore"
import { twMerge } from 'tailwind-merge'
import { readTextFile, remove } from '@tauri-apps/plugin-fs'
import { desktopDir, join } from "@tauri-apps/api/path"
import { FiTrash } from 'react-icons/fi';
import toast from "react-hot-toast";

interface Props {
  snippetName: string;
}

function SnippetItem({snippetName}: Props) {
  const setSelectedSnippet = useSnippetStore((state) => state.setSelectedSnippet)
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet)
  const removeSnippetName = useSnippetStore((state) => state.removeSnippetName)

  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm('Are you sure you want to delete this snippet?')
    if (!accept) return

    const desktopPath = await desktopDir()
    const filePath = await join(desktopPath, 'taurifiles', `${snippetName.replace('.js', '')}.js`)
    await remove(filePath)
    removeSnippetName(snippetName)

    toast.success('Snippet deleted', {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#202020",
        color: "#fff"
      }
    })
  }

  return (
    <div
    className={twMerge("py-2 px-4 hover:bg-purple-900 hover:cursor-pointer flex justify-between",
      selectedSnippet?.name === snippetName ? "bg-purple-950" : ""
    )}
    onClick={async() => {
      const desktopPath = await desktopDir();
      const filePath = await join(desktopPath, "taurifiles", `${snippetName.replace('.js', '')}.js`);

      const snippet = await readTextFile(filePath)
      setSelectedSnippet({name: snippetName, code: snippet})

    }}>
      <h1>{snippetName}</h1>

      <div className="flex gap-2">
        <FiTrash onClick={(e) => {
          e.stopPropagation()
          handleDelete(snippetName)
        }} className="text-neutral-600">
          
        </FiTrash>
      </div>
    </div>
  )
}

export default SnippetItem

