"""
SQL Query Runner — Loads Excel data into SQLite and executes all SQL analysis scripts.
Author: Sharan Biradar
Usage: python sql/run_queries.py
"""
import sqlite3
import pandas as pd
import os
import glob

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCEL_PATH = os.path.join(BASE_DIR, 'operational_intelligence_dataset.xlsx')
DB_PATH = os.path.join(BASE_DIR, 'data', 'operational_intelligence.db')

def load_data_to_sqlite():
    """Load Excel sheets into SQLite database."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH)
    
    sheets = {
        'Sales_Fact': 'Sales_Fact',
        'Product_Dim': 'Product_Dim',
        'Customer_Dim': 'Customer_Dim',
        'Warehouse_Dim': 'Warehouse_Dim'
    }
    
    for sheet_name, table_name in sheets.items():
        df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name)
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        print(f'  ✅ Loaded {table_name}: {len(df)} rows')
    
    conn.close()
    print(f'\n📁 Database saved to: {DB_PATH}')
    return DB_PATH

def run_sql_file(db_path, sql_file):
    """Execute all queries in a SQL file and print results."""
    conn = sqlite3.connect(db_path)
    
    with open(sql_file, 'r') as f:
        content = f.read()
    
    # Split by semicolons, filter out comments-only blocks
    queries = [q.strip() for q in content.split(';') if q.strip()]
    
    for query in queries:
        # Extract title from comments
        lines = query.split('\n')
        title_lines = [l.strip('- ') for l in lines if l.strip().startswith('--') and not l.strip().startswith('-- ==')]
        title = title_lines[0] if title_lines else 'Query'
        
        # Remove comment lines to get actual SQL
        sql_lines = [l for l in lines if not l.strip().startswith('--')]
        sql = '\n'.join(sql_lines).strip()
        
        if not sql or sql.upper().startswith('--'):
            continue
        
        try:
            result = pd.read_sql_query(sql, conn)
            print(f'\n{"=" * 70}')
            print(f'📊 {title}')
            print(f'{"=" * 70}')
            print(result.to_string(index=False))
            print(f'\n({len(result)} rows returned)')
        except Exception as e:
            if 'no tables' not in str(e).lower():
                print(f'\n⚠️  Error in query "{title}": {e}')
    
    conn.close()

if __name__ == '__main__':
    print('🗃️  Loading Excel data into SQLite...\n')
    db_path = load_data_to_sqlite()
    
    sql_dir = os.path.dirname(os.path.abspath(__file__))
    sql_files = sorted(glob.glob(os.path.join(sql_dir, '*.sql')))
    
    for sql_file in sql_files:
        filename = os.path.basename(sql_file)
        print(f'\n\n{"#" * 70}')
        print(f'# Running: {filename}')
        print(f'{"#" * 70}')
        run_sql_file(db_path, sql_file)
    
    print(f'\n\n✅ All queries executed successfully!')
    print(f'📁 SQLite database: {db_path}')
