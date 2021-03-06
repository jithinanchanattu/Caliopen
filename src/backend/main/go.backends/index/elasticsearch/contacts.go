// Copyleft (ɔ) 2017 The Caliopen contributors.
// Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
// license (AGPL) that can be found in the LICENSE file.

package index

import (
	"context"
	"errors"
	"fmt"
	. "github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
	log "github.com/Sirupsen/logrus"
	"gopkg.in/oleiade/reflections.v1"
)

func (es *ElasticSearchBackend) CreateContact(contact *Contact) error {
	return errors.New("[ElasticSearchBackend] not implemented")
}

func (es *ElasticSearchBackend) UpdateContact(contact *Contact, fields map[string]interface{}) error {

	//get json field name for each field to modify
	jsonFields := map[string]interface{}{}
	for field, value := range fields {
		jsonField, err := reflections.GetFieldTag(contact, field, "json")
		if err != nil {
			return fmt.Errorf("[ElasticSearchBackend] UpdateContact failed to find a json field for object field %s", field)
		}
		jsonFields[jsonField] = value
	}

	update, err := es.Client.Update().Index(contact.UserId.String()).Type(ContactIndexType).Id(contact.ContactId.String()).
		Doc(jsonFields).
		Refresh("wait_for").
		Do(context.TODO())
	if err != nil {
		log.WithError(err).Warn("[ElasticSearchBackend] updateContact operation failed")
		return err
	}
	log.Infof("New version of indexed contact %s is now %d", update.Id, update.Version)
	return nil
}

func (es *ElasticSearchBackend) SetContactUnread(user_id, Contact_id string, status bool) (err error) {
	return errors.New("[ElasticSearchBackend] not implemented")
}

func (es *ElasticSearchBackend) FilterContacts(filter IndexSearch) (Contacts []*Contact, totalFound int64, err error) {
	err = errors.New("[ElasticSearchBackend] not implemented")
	return
}
