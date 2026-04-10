-- V2__insert_admin_user.sql
-- Add admin account for testing
-- Credentials: admin@peakgym.com / Admin@123

-- Only insert if admin doesn't already exist
INSERT IGNORE INTO `user` (username, email, password, role, join_date, is_active) 
VALUES (
  'admin',
  'admin@peakgym.com',
  '$2a$10$Dw4XwjCnS2g1mPzgbtTCj.qatO6Rx8gOfDPwlTUQgLF.hWvZzFv8W',
  'ADMIN',
  CURDATE(),
  b'1'
);
