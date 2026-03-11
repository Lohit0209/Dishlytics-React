import pandas as pd
from sklearn.linear_model import LinearRegression
import json
import os

data_path = r'D:\meals_15000.xlsx'
if not os.path.exists(data_path):
    print(f"Error: File not found at {data_path}")
    exit(1)

df = pd.read_excel(data_path)


df = pd.get_dummies(df, columns=['meal_type'])
features = ['adults', 'teens', 'seniors', 'is_weekend'] + [c for c in df.columns if 'meal_type_' in c]
X = df[features]
y = df['cooked_grams']

model = LinearRegression()
model.fit(X, y)


weights = {
    'coefficients': dict(zip(features, model.coef_.tolist())),
    'intercept': model.intercept_
}

output_path = r'd:\smart-kitchen-analytics\src\model_weights.json'
with open(output_path, 'w') as f:
    json.dump(weights, f, indent=2)

print(f"Success! Model weights saved to {output_path}")
print("Final Weights:", json.dumps(weights, indent=2))
