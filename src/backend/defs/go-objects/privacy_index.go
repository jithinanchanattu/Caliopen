// Copyleft (ɔ) 2017 The Caliopen contributors.
// Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
// license (AGPL) that can be found in the LICENSE file.

package objects

import (
	"time"
)

type PrivacyIndex struct {
	Comportment int       `cql:"comportment"    json:"comportment"`
	Context     int       `cql:"context"        json:"context"`
	DateUpdate  time.Time `cql:"date_update"    json:"date_update"`
	Technic     int       `cql:"technic"        json:"technic"`
	Version     int       `cql:"version"        json:"version"`
}

func (pi *PrivacyIndex) UnmarshalMap(input map[string]interface{}) error {

	if pi_comp, ok := input["comportment"].(float64); ok {
		pi.Comportment = int(pi_comp)
	}

	if pi_ctx, ok := input["context"].(float64); ok {
		pi.Context = int(pi_ctx)
	}

	if date, ok := input["date_update"]; ok {
		pi.DateUpdate, _ = time.Parse(time.RFC3339Nano, date.(string))
	}

	if pi_tech, ok := input["technic"].(float64); ok {
		pi.Technic = int(pi_tech)
	}

	if pi_ver, ok := input["version"].(float64); ok {
		pi.Version = int(pi_ver)
	}
	return nil //TODO: errors handling
}
