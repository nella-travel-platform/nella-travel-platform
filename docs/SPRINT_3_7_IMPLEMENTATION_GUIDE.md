Sprint 3.7 Implementation Guide

What this package contains

MILESTONE_3_DATABASE_BLUEPRINT.md

003_experience_os_core.sql

This implementation guide

Important

This migration has not been applied to your Supabase project yet.

It introduces a new product-first architecture while preserving your existing tables. Before running it, we should review the existing Supabase schema and decide whether the current partners, vehicles, vehicle_categories, and manufacturers tables will be:

retained and linked to the new schema,

migrated into the new schema, or

replaced after data migration.

Do not delete the existing tables.

Recommended implementation sequence

Step 1 — Save the files in the project

Place the files here:

docs/MILESTONE_3_DATABASE_BLUEPRINT.md
database/migrations/003_experience_os_core.sql
docs/SPRINT_3_7_IMPLEMENTATION_GUIDE.md

Create database/migrations if it does not exist.

Step 2 — Commit the design package

git add .
git commit -m "Add Sprint 3.7 database blueprint"
git push

Step 3 — Review current Supabase tables

In Supabase Table Editor, confirm the columns in:

partners

vehicles

vehicle_categories

manufacturers

We need the exact structure before applying the new migration.

Step 4 — Run a compatibility migration

The next migration will map the current tables to the new tenant/product model without losing information.

Step 5 — Apply RLS policies

RLS has been enabled in the migration, but policies are intentionally deferred until authentication roles and tenant membership rules are finalized and tested.

Definition of done for Sprint 3.7

Blueprint committed to GitHub.

Existing schema documented.

Compatibility migration approved.

Core schema applied successfully.

RLS policies tested for Admin, Partner, and Customer roles.

Seed product types and capabilities verified.