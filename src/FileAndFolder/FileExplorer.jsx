import { useState } from "react";
import FileAndFolder from "./FileFolder";
import "../styles.css";

const initialData = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "index.html", isFolder: false }],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      { id: 4, name: "App.js", isFolder: false },
      { id: 5, name: "index.js", isFolder: false },
    ],
  },
  { id: 6, name: "package.json", isFolder: false },
];
export default function FileExplorer() {
  const [data, setData] = useState(initialData);

  const onAddNewFileFolder = (parentId, isFolder) => {
    const fileName = prompt("Enter File/Folder Name: ");
    if (!fileName) return;

    const updateTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now(),
                name: fileName,
                isFolder,
                children: [],
              },
            ],
          };
        }

        return {
          ...node,
          children: node.children ? updateTree(node.children) : node.children,
        };
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFile = (fileIdToDelete) => {
    const updateTree = (nodes) => {
      if (!nodes) return [];

      return (
        nodes
          // 1. remove the node
          .filter((node) => node.id !== fileIdToDelete)
          // 2. recursively update children
          .map((node) => ({
            ...node,
            children: node.children ? updateTree(node.children) : node.children,
          }))
      );
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div>
      <h2>File Explorer</h2>
      <FileAndFolder
        data={data}
        onAddNewFileFolder={onAddNewFileFolder}
        deleteNodeFile={deleteNodeFile}
      />
    </div>
  );
}
