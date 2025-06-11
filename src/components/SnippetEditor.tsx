import Editor from 'react-monaco-editor';
import { useSnippetStore } from '../store/SnippetStore';
import { useEffect, useState } from 'react';
import { writeTextFile } from '@tauri-apps/plugin-fs'
import { desktopDir, join } from '@tauri-apps/api/path';
import { TfiPencil } from 'react-icons/tfi';

function SnippetEditor() {
  const selectedSnippet = useSnippetStore(state => state.selectedSnippet)
  const [text, setText] = useState<string|undefined>('')

  useEffect(() => {
    if (!selectedSnippet) return;

    const saveText = setTimeout(async() => {
      console.log("saving")
      const desktopPath = await desktopDir()
      const filePath = await join(desktopPath, "taurifiles", `${selectedSnippet.name.replace('.js', '')}.js`)
      await writeTextFile(filePath,
        text ?? ""
      );
    }, 1000)

    return () => {
      clearTimeout(saveText)
    }
  }, [text])
  
  return (
   <>
   {
    selectedSnippet ? (
      <Editor
        theme="vs-dark"
        language="typescript"
        options={{
          fontSize: 20,
          minimap: { enabled: true }
      }}
      onChange={(value) => setText(value)}
      value={selectedSnippet.code ?? ""}/>
    ) : (
      <div className='flex gap-5'>
        <TfiPencil className='text-4xl text-neutral-600'/>
        <h1>No Snippet Selected</h1>
      </div>
    )
   }
   </>
  )
}

export default SnippetEditor