/* ==========================================================================
   MOCK DATABASE & FEFO ENGINE (EXPANDED DATASET)
   ========================================================================== */

const APOTEK_DB = {
    shiftInfo: {
        cashierName: "Denna Agustin",
        shiftStart: "14:00 WIB",
        todayTrxCount: 18,
        todayTotalRevenue: 845000
    },
    medicines: [
        {
            id: "PCT-500",
            code: "OBT-001",
            name: "Paracetamol 500mg",
            category: "Analgesik",
            unit: "Strip",
            form: "Tablet",
            price: 8000,
            batches: [
                { batchNo: "BTH-PCT-A1", edFormatted: "15 Nov 2026", stock: 3 },
                { batchNo: "BTH-PCT-A2", edFormatted: "20 Jan 2027", stock: 10 }
            ]
        },
        {
            id: "AMX-500",
            code: "OBT-002",
            name: "Amoxicillin 500mg",
            category: "Antibiotik",
            unit: "Strip",
            form: "Kapsul",
            price: 12000,
            batches: [
                { batchNo: "BTH-AMX-09", edFormatted: "05 Nov 2026", stock: 4 }
            ]
        },
        {
            id: "CTZ-10",
            code: "OBT-003",
            name: "Cetirizine 10mg",
            category: "Antihistamin",
            unit: "Strip",
            form: "Tablet",
            price: 6500,
            batches: [
                { batchNo: "BTH-CTZ-77", edFormatted: "10 Des 2026", stock: 25 }
            ]
        },
        {
            id: "OBH-100",
            code: "OBT-004",
            name: "OBH Tropica Plus 100ml",
            category: "Sirup",
            unit: "Botol",
            form: "Sirup",
            price: 24000,
            batches: [
                { batchNo: "BTH-OBH-01", edFormatted: "18 Mei 2027", stock: 8 }
            ]
        },
        {
            id: "IBU-400",
            code: "OBT-005",
            name: "Ibuprofen 400mg",
            category: "Analgesik",
            unit: "Strip",
            form: "Kaplet",
            price: 9500,
            batches: [
                { batchNo: "BTH-IBU-12", edFormatted: "22 Nov 2026", stock: 5 },
                { batchNo: "BTH-IBU-13", edFormatted: "14 Feb 2027", stock: 15 }
            ]
        },
        {
            id: "ATD-SUSP",
            code: "OBT-006",
            name: "Antasida Doen Suspensi",
            category: "Lambung",
            unit: "Botol",
            form: "Suspensi",
            price: 11000,
            batches: [
                { batchNo: "BTH-ATD-03", edFormatted: "02 Des 2026", stock: 3 }
            ]
        },
        {
            id: "CFX-100",
            code: "OBT-007",
            name: "Cefixime 100mg",
            category: "Antibiotik",
            unit: "Strip",
            form: "Kapsul",
            price: 32000,
            batches: [
                { batchNo: "BTH-CFX-88", edFormatted: "15 Jan 2027", stock: 6 }
            ]
        },
        {
            id: "DXM-05",
            code: "OBT-008",
            name: "Dexamethasone 0.5mg",
            category: "Kortikosteroid",
            unit: "Strip",
            form: "Tablet",
            price: 5000,
            batches: [
                { batchNo: "BTH-DXM-01", edFormatted: "08 Des 2026", stock: 20 }
            ]
        }
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