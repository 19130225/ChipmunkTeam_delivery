CREATE TABLE IF NOT EXISTS location (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location_start VARCHAR(255),
  location_end VARCHAR(255)
);

INSERT INTO `location` (`location_start`, `location_end`) VALUES ('Binh Dương', 'Long An'),
																  ('Binh Dương', 'Bình Phước'),
																  ('Binh Dương', 'Hà Nội');






