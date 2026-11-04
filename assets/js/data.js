/* ==========================================================================
   EXPANDED MOCK DATABASE & INSTANT ZERO-RELOAD PAGINATION ENGINE
   ========================================================================== */

const APOTEK_DB = {
    shiftInfo: {
        cashierName: "Nazla Khorerunisa",
        shiftStart: "14:00 WIB",
        todayTrxCount: 18,
        todayTotalRevenue: 845000
    },
    // DATASET 20 OBAT UNTUK SIMULASI PAGINATION NYATA
    medicines: [
        { id: "PCT-500", code: "OBT-001", name: "Paracetamol 500mg", category: "Analgesik", unit: "Strip", form: "Tablet", price: 8000, batches: [{ batchNo: "BTH-PCT-A1", edFormatted: "15 Nov 2026", stock: 3 }, { batchNo: "BTH-PCT-A2", edFormatted: "20 Jan 2027", stock: 10 }] },
        { id: "AMX-500", code: "OBT-002", name: "Amoxicillin 500mg", category: "Antibiotik", unit: "Strip", form: "Kapsul", price: 12000, batches: [{ batchNo: "BTH-AMX-09", edFormatted: "05 Nov 2026", stock: 4 }] },
        { id: "CTZ-10",  code: "OBT-003", name: "Cetirizine 10mg", category: "Antihistamin", unit: "Strip", form: "Tablet", price: 6500, batches: [{ batchNo: "BTH-CTZ-77", edFormatted: "10 Des 2026", stock: 25 }] },
        { id: "OBH-100", code: "OBT-004", name: "OBH Tropica Plus 100ml", category: "Sirup", unit: "Botol", form: "Sirup", price: 24000, batches: [{ batchNo: "BTH-OBH-01", edFormatted: "18 Mei 2027", stock: 8 }] },
        { id: "IBU-400", code: "OBT-005", name: "Ibuprofen 400mg", category: "Analgesik", unit: "Strip", form: "Kaplet", price: 9500, batches: [{ batchNo: "BTH-IBU-12", edFormatted: "22 Nov 2026", stock: 5 }, { batchNo: "BTH-IBU-13", edFormatted: "14 Feb 2027", stock: 15 }] },
        { id: "ATD-SUSP",code: "OBT-006", name: "Antasida Doen Suspensi", category: "Lambung", unit: "Botol", form: "Suspensi", price: 11000, batches: [{ batchNo: "BTH-ATD-03", edFormatted: "02 Des 2026", stock: 3 }] },
        { id: "CFX-100", code: "OBT-007", name: "Cefixime 100mg", category: "Antibiotik", unit: "Strip", form: "Kapsul", price: 32000, batches: [{ batchNo: "BTH-CFX-88", edFormatted: "15 Jan 2027", stock: 6 }] },
        { id: "DXM-05",  code: "OBT-008", name: "Dexamethasone 0.5mg", category: "Kortikosteroid", unit: "Strip", form: "Tablet", price: 5000, batches: [{ batchNo: "BTH-DXM-01", edFormatted: "08 Des 2026", stock: 20 }] },
        { id: "OMP-20",  code: "OBT-009", name: "Omeprazole 20mg", category: "Lambung", unit: "Strip", form: "Kapsul", price: 18000, batches: [{ batchNo: "BTH-OMP-04", edFormatted: "14 Des 2026", stock: 12 }] },
        { id: "VIT-C500",code: "OBT-010", name: "Vitamin C 500mg IPI", category: "Vitamin", unit: "Botol", form: "Tablet", price: 9000, batches: [{ batchNo: "BTH-VTC-90", edFormatted: "10 Mar 2027", stock: 30 }] },
        { id: "LPR-02",  code: "OBT-011", name: "Loperamide 2mg", category: "Saluran Cerna", unit: "Strip", form: "Tablet", price: 4500, batches: [{ batchNo: "BTH-LPR-11", edFormatted: "28 Nov 2026", stock: 18 }] },
        { id: "ASM-500", code: "OBT-012", name: "Asam Mefenamat 500mg", category: "Analgesik", unit: "Strip", form: "Kaplet", price: 8500, batches: [{ batchNo: "BTH-ASM-02", edFormatted: "12 Jan 2027", stock: 14 }] },
        { id: "SLB-02",  code: "OBT-013", name: "Salbutamol 2mg", category: "Pernapasan", unit: "Strip", form: "Tablet", price: 7000, batches: [{ batchNo: "BTH-SLB-55", edFormatted: "05 Des 2026", stock: 9 }] },
        { id: "MCD-01",  code: "OBT-014", name: "Micodermal Krim 10g", category: "Topikal", unit: "Tube", form: "Krim", price: 17500, batches: [{ batchNo: "BTH-MCD-80", edFormatted: "19 Apr 2027", stock: 7 }] },
        { id: "CPZ-04",  code: "OBT-015", name: "Captopril 25mg", category: "Kardiovaskular", unit: "Strip", form: "Tablet", price: 6000, batches: [{ batchNo: "BTH-CPZ-23", edFormatted: "16 Nov 2026", stock: 22 }] },
        { id: "BCO-TAB", code: "OBT-016", name: "Vitamin B-Complex", category: "Vitamin", unit: "Botol", form: "Tablet", price: 11500, batches: [{ batchNo: "BTH-BCO-41", edFormatted: "24 Feb 2027", stock: 40 }] },
        { id: "MTC-05",  code: "OBT-017", name: "Metoclopramide 5mg", category: "Saluran Cerna", unit: "Strip", form: "Tablet", price: 5500, batches: [{ batchNo: "BTH-MTC-07", edFormatted: "03 Des 2026", stock: 11 }] },
        { id: "ALP-01",  code: "OBT-018", name: "Allopurinol 100mg", category: "Asam Urat", unit: "Strip", form: "Tablet", price: 10500, batches: [{ batchNo: "BTH-ALP-99", edFormatted: "21 Jan 2027", stock: 16 }] },
        { id: "SMC-STR", code: "OBT-019", name: "Simvastatin 10mg", category: "Kolesterol", unit: "Strip", form: "Tablet", price: 13000, batches: [{ batchNo: "BTH-SMC-15", edFormatted: "18 Des 2026", stock: 8 }] },
        { id: "BTP-SYR", code: "OBT-020", name: "Betadine Kumur 100ml", category: "Antiseptik", unit: "Botol", form: "Cair", price: 34000, batches: [{ batchNo: "BTH-BTP-03", edFormatted: "30 Mei 2027", stock: 15 }] }
    ]
};

function getTotalStock(medicine) {
    return medicine.batches.reduce((acc, b) => acc + b.stock, 0);
}

function calculateFEFOAllocation(medicine, requestQty) {
    let remaining = requestQty;
    const allocation = [];

    for (const batch of medicine.batches) {
        if (remaining <= 0) break;
        if (batch.stock > 0) {
            const taken = Math.min(remaining, batch.stock);
            allocation.push({
                batchNo: batch.batchNo,
                edFormatted: batch.edFormatted,
                takenQty: taken
            });
            remaining -= taken;
        }
    }

    return {
        isSplit: allocation.length > 1,
        allocation: allocation
    };
}

// MESIN PAGINATION INSTAN (CLIENT-SIDE REUSABLE)
function getPaginatedItems(itemsArray, page = 1, pageSize = 8) {
    const totalItems = itemsArray.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedItems = itemsArray.slice(startIndex, endIndex);

    return {
        items: paginatedItems,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex
    };
}
