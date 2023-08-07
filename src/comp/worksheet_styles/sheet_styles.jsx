const applyStylesToWorksheet = (worksheet) => {
    // Define the styles
    const headerStyle = { font: { bold: true } };
    const cellStyle = { fill: { fgColor: { rgb: "FF0000FF" } } }; // Example: sets cell background color to blue
  
    // Apply styles to the header row
    const headerRange = utils.decode_range(worksheet["!ref"]);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const headerCell = utils.encode_cell({ r: headerRange.s.r, c: col });
      worksheet[headerCell].s = headerStyle;
    }
  
    // Apply styles to all cells
    for (const cellAddress in worksheet) {
      if (cellAddress[0] === "!") continue;
      worksheet[cellAddress].s = cellStyle;
    }
  };

 