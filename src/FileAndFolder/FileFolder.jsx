import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";

const Entity = ({ itemDetails, onAddNewFileFolder, deleteNodeFile }) => {
  const [isExpended, setIsExpended] = useState(false);
  const isFolder = itemDetails.isFolder || false;

  return (
    <div className="list">
      <div className="entity-item">
        {isFolder && (
          <div onClick={() => setIsExpended((prev) => !prev)}>
            {isExpended ? <MdExpandLess /> : <MdExpandMore />}
          </div>
        )}
        <div>{itemDetails.name}</div>
        {isFolder && (
          <FiFolderPlus
            onClick={() => onAddNewFileFolder(itemDetails.id, true)}
          />
        )}
        {isFolder && (
          <AiOutlineFileAdd
            onClick={() => onAddNewFileFolder(itemDetails.id, false)}
          />
        )}
        <MdDeleteOutline onClick={() => deleteNodeFile(itemDetails.id)} />
      </div>
      {itemDetails.children && isExpended && (
        <FileAndFolder
          data={itemDetails.children}
          onAddNewFileFolder={onAddNewFileFolder}
          deleteNodeFile={deleteNodeFile}
        />
      )}
    </div>
  );
};

const FileAndFolder = ({ data, onAddNewFileFolder, deleteNodeFile }) => {
  return (
    <div>
      {data.map((itemDetail) => (
        <Entity
          key={itemDetail.id}
          itemDetails={itemDetail}
          onAddNewFileFolder={onAddNewFileFolder}
          deleteNodeFile={deleteNodeFile}
        />
      ))}
    </div>
  );
};

export default FileAndFolder;
