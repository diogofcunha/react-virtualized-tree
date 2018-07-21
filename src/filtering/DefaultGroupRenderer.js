import React from 'react';

const DefaultGroupRenderer = ({onChange, groups, selectedGroup}) => {
  return (
    <select
      className="tree-group"
      onChange={({target: {value}}) => {
        onChange(value);
      }}
      value={selectedGroup}
    >
      {Object.keys(groups).map(g => (
        <option key={g} value={g}>
          {groups[g].name}
        </option>
      ))}
    </select>
  );
};

export default DefaultGroupRenderer;
