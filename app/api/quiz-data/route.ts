import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

const QUIZ_DIR = path.join(process.cwd(), 'public', 'quiz');

export async function GET() {
    try {
        const categories = await fs.readdir(QUIZ_DIR);
        const data: Record<string, any> = {};

        for (const category of categories) {
            const categoryPath = path.join(QUIZ_DIR, category);
            const isCategoryDir = (await fs.stat(categoryPath)).isDirectory();
            if (!isCategoryDir) continue;

            const subcategories = await fs.readdir(categoryPath);
            data[category] = {};

            for (const subcategory of subcategories) {
                const subcategoryPath = path.join(categoryPath, subcategory);
                const isSubcategoryDir = (await fs.stat(subcategoryPath)).isDirectory();
                if (!isSubcategoryDir) continue;

                const files = await fs.readdir(subcategoryPath);
                const jsonFile = files.find(file => file.endsWith('.json'));

                if (!jsonFile) {
                    console.warn(`No JSON file found in ${subcategoryPath}`);
                    continue;
                }

                const quizPath = path.join(subcategoryPath, jsonFile);
                try {
                    const quizContent = await fs.readFile(quizPath, 'utf-8');
                    const quizData = JSON.parse(quizContent);
                    data[category][subcategory] = quizData;
                } catch (err) {
                    console.warn(`Failed to parse JSON in ${quizPath}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to read quiz data', error: String(error) },
            { status: 500 }
        );
    }
}
