class LocationSerializer

    def initialize(user_object)
       @location = user_object
    end
  def to_serialized_json
      options = {
        include: {
          user: {
            only: [:id,:name]
          },
          receipts:{
            only:[:id, :project_name]
          }
        },
        except: [:updated_at, :created_at]
      }
      @location.to_json(options)
    end
  
  end