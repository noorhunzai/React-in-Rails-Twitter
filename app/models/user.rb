require 'bcrypt'

class User < ApplicationRecord
  # Associations
  has_many :sessions
  has_many :tweets

  # Virtual attribute for the plain-text password
  attr_accessor :plain_password

  # Validations
  validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 64 }
  validates :email, presence: true, uniqueness: true, length: { minimum: 5, maximum: 500 }
  validates :plain_password, presence: true, length: { minimum: 8, maximum: 64 }, on: :create

  # Callbacks
  before_save :hash_password, if: -> { plain_password.present? }

  private

  def hash_password
    self.password = BCrypt::Password.create(plain_password, cost: 12)
  end
end
