// MagicIsland.js
import React, { useState, useEffect } from 'react';

const MagicIsland = ({ onSearch, tags, categories }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    onSearch(searchInput);
  }, [searchInput, onSearch]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleTagChange = (event) => {
    const selectedTag = event.target.value;
    setSearchInput(selectedTag ? `tag:${selectedTag}` : '');
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSearchInput(selectedCategory ? `category:${selectedCategory}` : '');
  };

  const countOccurrences = (arr) => {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  const sortOptions = (options, counts) => {
    return options.sort((a, b) => counts[b.label] - counts[a.label] || a.label.localeCompare(b.label));
  };

  const sortedCategories = sortOptions(
    categories.map((category) => ({
      label: category,
    })),
    categoryCounts
  );

  const sortedTags = sortOptions(
    tags.map((tag) => ({
      label: tag,
    })),
    tagCounts
  );

  return (
    <div className="cattags" style={{ maxWidth: '', margin: '0px auto 0 auto', display: 'flex', placeSelf: 'center', gap: '8px', outline: '1px solid #333', borderRadius: '3px', padding: '8px', color: '' }}>
      <div className="category-selector" style={{ marginTop: '' }}>
        <select className="" onChange={handleCategoryChange} value={searchInput.startsWith('category:') ? searchInput.replace('category:', '') : ''} style={{ background: '#222', border: '1px solid #000', borderRadius: '3px', padding: '2px' }}>
          <option value="">Category</option>
          {sortedCategories.map((category) => (
            <option key={category.label} value={category.label}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="tag-selector" style={{ marginTop: '' }}>
        <select className="" onChange={handleTagChange} value={searchInput.startsWith('tag:') ? searchInput.replace('tag:', '') : ''} style={{ background: '#222', border: '1px solid #000', borderRadius: '3px', padding: '2px' }}>
          <option value="">Keyword</option>
          {sortedTags.map((tag) => (
            <option key={tag.label} value={tag.label}>
              {tag.label}
            </option>
          ))}
        </select>
      </div>

      <label style={{ position: 'relative', width: '100%' }}>
        <input id="clearme" type="text" placeholder="Search:" onChange={handleSearchChange} value={searchInput} style={{ width: '80%', background: '#222', marginRight: '10px', border: '1px solid #000', borderRadius: '3px', height: '24px', padding: '14px' }} />
        <button className="" type="reset" value="reset" onClick={() => setSearchInput('')} style={{ position: 'absolute', right: '0', top: '0', background: '#222', color: '#fff', textAlign: 'center', fontSize: '10px', height: '', maxWidth: '60px', border: '1px solid #000', padding: '5px', borderRadius: '3px' }}>Clear</button>
      </label>
    </div>
  );
};

export default MagicIsland;
