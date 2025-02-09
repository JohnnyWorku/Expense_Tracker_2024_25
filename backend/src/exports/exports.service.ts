import { Injectable } from '@nestjs/common';
import { Expense } from '../expenses/expense.entity';
import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ExportsService {
  async exportToCSV(expenses: Expense[]): Promise<string> {
    const csvWriter = createObjectCsvWriter({
      path: 'expenses.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'amount', title: 'Amount' },
        { id: 'description', title: 'Description' },
        { id: 'category', title: 'Category' },
        { id: 'date', title: 'Date' },
      ],
    });

    await csvWriter.writeRecords(expenses);
    return 'expenses.csv';
  }

  async exportToPDF(expenses: Expense[]): Promise<string> {
    const doc = new PDFDocument();
    const path = 'expenses.pdf';
    const writeStream = fs.createWriteStream(path);
    doc.pipe(writeStream);

    doc.text('Expenses Report', { align: 'center', underline: true });
    doc.moveDown();

    expenses.forEach((expense) => {
      doc.text(`ID: ${expense.id}`);
      doc.text(`Amount: ${expense.amount}`);
      doc.text(`Description: ${expense.description}`);
      doc.text(`Category: ${expense.category}`);
      doc.text(`Date: ${expense.date}`);
      doc.moveDown();
    });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(path));
      writeStream.on('error', reject);
    });
  }
}
