class UserSerializer

    def initialize(user_object)
       @user = user_object
    end
  def to_serialized_json
      options = {
        include: {
          locations: {
            only: [:id,:address ]
          },
          receipts: {
            only: [:id,:project_name, :location_id]
          },
          items: {
            only: [:id,:receipt_id,:item_name,:price]
          }
        },

        except: [:updated_at, :created_at]
      }

      @user.to_json(options)
    end
  
  end