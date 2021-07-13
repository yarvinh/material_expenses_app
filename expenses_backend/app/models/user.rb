class User < ApplicationRecord
    has_secure_password
    
    has_many :locations
    has_many :receipts, through: :locations
    has_many :items
    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true
    validates_with OldPasswordValidator , :if => :password_required?

  
    
     
    validates :password, :presence =>true, :confirmation =>true , :if => :password_required?
    validates_confirmation_of :password , :if => :password_required?

   def old_password=(password)
     if self.authenticate(password[:old_password])
      @old_password = true
     end
   end

   def old_password
    @old_password
   end
    protected

  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end
end
